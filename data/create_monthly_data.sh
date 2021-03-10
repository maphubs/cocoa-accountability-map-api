#!/bin/sh

#project to WGS84
rm ews_wgs84.tif
gdalwarp -t_srs EPSG:4326 ews_disturbances_by_day.tif ews_wgs84.tif

# values are days since April 3, 2014 the launch date of Sentinel-1

#unset nodata 
gdal_edit.py -unsetnodata ews_wgs84.tif
# 2020-01
#start >=2099
#end <2130
gdal_calc.py --calc="(A>=2099) * (A<2130)" -A ews_wgs84.tif --outfile=2020-01.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-01.tif
gdal_polygonize.py -f GeoJSON 2020-01.tif 2020-01.geojson
# 2020-02
# start >=2130
#end <2159
gdal_calc.py --calc="(A>=2130) * (A<2159)" -A ews_wgs84.tif --outfile=2020-02.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-02.tif
gdal_polygonize.py -f GeoJSON 2020-02.tif 2020-02.geojson
# 2020-03
# start >=2159
#end <2190
gdal_calc.py --calc="(A>=2159) * (A<2190)" -A ews_wgs84.tif --outfile=2020-03.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-03.tif
gdal_polygonize.py -f GeoJSON 2020-03.tif 2020-03.geojson
# 2020-04
# start >=2190
#end <2220
gdal_calc.py --calc="(A>=2190) * (A<2220)" -A ews_wgs84.tif --outfile=2020-04.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-04.tif
gdal_polygonize.py -f GeoJSON 2020-04.tif 2020-04.geojson
# 2020-05
# start >=2220
#end <2251
gdal_calc.py --calc="(A>=2220) * (A<2251)" -A ews_wgs84.tif --outfile=2020-05.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-05.tif
gdal_polygonize.py -f GeoJSON 2020-05.tif 2020-05.geojson
# 2020-06
# start >=2251
#end <2281
gdal_calc.py --calc="(A>=2251) * (A<2281)" -A ews_wgs84.tif --outfile=2020-06.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-06.tif
gdal_polygonize.py -f GeoJSON 2020-06.tif 2020-06.geojson
# 2020-07
# start >=2281
#end <2312
gdal_calc.py --calc="(A>=2281) * (A<2312)" -A ews_wgs84.tif --outfile=2020-07.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-07.tif
gdal_polygonize.py -f GeoJSON 2020-07.tif 2020-07.geojson
# 2020-08
# start >=2312
#end <2343
gdal_calc.py --calc="(A>=2312) * (A<2343)" -A ews_wgs84.tif --outfile=2020-08.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-08.tif
gdal_polygonize.py -f GeoJSON 2020-08.tif 2020-08.geojson

# 2020-09
# start >=2343
#end <2373
gdal_calc.py --calc="(A>=2343) * (A<2373)" -A ews_wgs84.tif --outfile=2020-09.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-09.tif
gdal_polygonize.py -f GeoJSON 2020-09.tif 2020-09.geojson

# 2020-10
# start >=2373
#end <2404
gdal_calc.py --calc="(A>=2373) * (A<2404)" -A ews_wgs84.tif --outfile=2020-10.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-10.tif
gdal_polygonize.py -f GeoJSON 2020-10.tif 2020-10.geojson

# 2020-11
# start >=2404
#end <2434
gdal_calc.py --calc="(A>=2404) * (A<2434)" -A ews_wgs84.tif --outfile=2020-11.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-11.tif
gdal_polygonize.py -f GeoJSON 2020-11.tif 2020-11.geojson

# 2020-12
# start >=2434
#end <2465
gdal_calc.py --calc="(A>=2434) * (A<2465)" -A ews_wgs84.tif --outfile=2020-12.tif --type=Byte --co=NBITS=1 --co=COMPRESS=LZW --co=SPARSE_OK=TRUE --co=NUM_THREADS=ALL_CPUS
gdal_edit.py -a_nodata 0 2020-12.tif
gdal_polygonize.py -f GeoJSON 2020-12.tif 2020-12.geojson
