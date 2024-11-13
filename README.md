# 30DayMapChallenge_GIS
# RasterDay6 Project

This project demonstrates how to extract and visualize potential fault zones from gradient data using Python libraries. The data used is the magnetic variation GeoTIFF of Mineral, VA, after the 2011 earthquake.

## Project Overview

1. **Inspecting the GeoTIFF File**
   - Understanding its properties such as the number of bands, CRS, bounds, and data type.

2. **Reprojecting the GeoTIFF File**
   - Converting the file to WGS84 (EPSG:4326) using GDAL.

3. **Extracting Fault Zones**
   - Using gradient data to identify and extract potential fault zones as vector polygons.

4. **Visualizing Fault Zones on a Map**
   - Displaying the extracted fault zones on an interactive map using Leaflet.

5. **Running a Flask Server**
   - Serving the map HTML and GeoTIFF files for easy access and visualization.

## Results

The project successfully identifies and visualizes potential fault zones in the magnetic variation data of Mineral, VA, post-2011 earthquake.

## Dependencies

- Python
- GDAL
- Leaflet
- Flask

## Usage

1. **Inspect GeoTIFF File**: Run the script to inspect the properties of the GeoTIFF file.
2. **Reproject GeoTIFF File**: Use GDAL to reproject the GeoTIFF file to WGS84.
3. **Extract Fault Zones**: Process the gradient data to identify and extract fault zones.
4. **Visualize Fault Zones**: Use Leaflet to create an interactive map displaying the fault zones.
5. **Run Flask Server**: Start the Flask server to serve the map and files.

## Conclusion

This project provides a comprehensive approach to extracting and visualizing fault zones from gradient data, showcasing the capabilities of Python libraries in geospatial analysis and visualization.
