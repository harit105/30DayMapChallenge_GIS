require([
    "esri/Map",
    "esri/views/MapView",
    "esri/config",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
], (Map, MapView, esriConfig, FeatureLayer, Legend) => {
    esriConfig.apiKey = "AAPTxy8BH1VEsoebNVZXo8HurJLFIpW6LSEO6wOl6ICOV4I4Y_TbMmWNO1bhDot0W9i1B2cCBZllDtnRJZbB-coucxWN585WE75UWmerwWgu7FseUK5lvwNmk07krvLDi8jHXT_Lpkqck6LZJ9x-PKAN8ZF-sm_exOIPUH_OF-T4Y5Cpgylfknr05gTD8PLnG7rOiLiP0dtjLeky3vjpT2ukPmm7hxbLV6LES3w3hu9DBbpVpBZMoGfjsL6WeRoI_5eaAT1_Ytf4789V";

    const map = new Map({ basemap: "streets-navigation-vector" });

    const view = new MapView({
        container: "map",
        map: map,
        center: [-100.33, 43.69],
        zoom: 3,
    });

    const featureLayer2 = new FeatureLayer({
        url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/ArcGIS/rest/services/Structures_Medical_Emergency_Response_v1/FeatureServer/0",
        outFields: ["NAME", "ADDRESS", "CITY", "STATE", "ZIPCODE"],
        popupTemplate: {
            title: "Medical Center: {NAME}",
            content: `
                <b>Address:</b> {ADDRESS}<br>
                <b>City:</b> {CITY}<br>
                <b>State:</b> {STATE}<br>
                <b>ZIP Code:</b> {ZIPCODE}
            `,
        },
    });

    map.add(featureLayer2);

    const legend = new Legend({
        view: view,
        layerInfos: [
            { layer: featureLayer2, title: "Medical Centers" },
        ],
    });

    view.ui.add(legend, "bottom-right");

    // Add this CSS at the top of your file
    const customPopupCSS = `
        .esri-popup__header {
            background-color: #4CAF50; /* Green */
            color: white;
            font-size: 16px;
            padding: 10px;
        }
        .esri-popup__content {
            background-color: #f9f9f9;
            padding: 15px;
            font-family: Arial, sans-serif;
        }
        .info-row {
            margin: 8px 0;
            padding: 8px;
            background-color: #ffffff;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .info-label {
            color: #333;
            font-weight: bold;
        }
        .ai-insight {
            margin-top: 15px;
            padding: 10px;
            background-color: #e8f4ff;
            border-left: 4px solid #0079c1;
            border-radius: 4px;
        }
    `;

    // Add the style to the document
    const style = document.createElement('style');
    style.textContent = customPopupCSS;
    document.head.appendChild(style);

    // Function to fetch AI insights
    async function fetchOpenAI(prompt) {
        const response = await fetch('http://localhost:3000/api/openai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        return data.insight;
    }

    // Handle map clicks for the feature layer
    view.on("click", async (event) => {
        const results = await view.hitTest(event);
        const graphics = results.results.filter(
            (result) => result.graphic.layer === featureLayer2
        );

        if (graphics.length > 0) {
            const { attributes } = graphics[0].graphic;
            const prompt = `
                Provide an engaging 2-3 sentence insight based on:
                - Medical Center: ${attributes.NAME}
                - Address: ${attributes.ADDRESS}
                - City: ${attributes.CITY}
                - State: ${attributes.STATE}
                - ZIP Code: ${attributes.ZIPCODE}
            `;

            const aiInsight = await fetchOpenAI(prompt);

            view.popup.open({
                location: event.mapPoint,
                title: `Medical Center: ${attributes.NAME}`,
                content: `
                    <div class="info-row">
                        <span class="info-label">Address:</span> ${attributes.ADDRESS}
                    </div>
                    <div class="info-row">
                        <span class="info-label">City:</span> ${attributes.CITY}
                    </div>
                    <div class="info-row">
                        <span class="info-label">State:</span> ${attributes.STATE}
                    </div>
                    <div class="info-row">
                        <span class="info-label">ZIP Code:</span> ${attributes.ZIPCODE}
                    </div>
                    <div class="ai-insight">
                        <span class="info-label">AI Insight:</span><br>
                        ${aiInsight}
                    </div>
                `,
            });
        }
    });
});
