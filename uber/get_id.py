#!/usr/bin/env python
# Copyright 2006 Google Inc. All Rights Reserved.

#This file accepts two float number, 1st latitude 2nd longitude
#It returns a cell id at level 12 of this point, because
#12 is a good level, 3-6 km^2 area.
#It uses s2-geometry-lib, see here https://github.com/micolous/s2-geometry-library
#Given one level and one position, it should only return one cellid. However,
#if either latitude or longitude is zero then it will return two cellids. So if
#both latitude and longitude are zero it will return four cellids. [maybe a bug]

import sys
from s2 import *

def get_id(latitude, longitude, min_level, max_level):
  point= S2LatLng.FromDegrees(latitude, longitude)
  place = S2LatLngRect(point, point) #get id only at this point
  coverer = S2RegionCoverer()
  coverer.set_min_level(min_level);
  coverer.set_max_level(max_level);
  covering = coverer.GetCovering(place)
  for cellid in covering:
    return cellid.id() #make sure only one cell is return

if __name__ == '__main__':
    while True:
      line = raw_input()
      latlog = json.loads(line)
      print get_id(float(latlog['lat']), float(latlog['log']), 12, 12) 
