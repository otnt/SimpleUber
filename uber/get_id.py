#!/usr/bin/env python
# Copyright 2006 Google Inc. All Rights Reserved.

#This file accepts two float number, 1st latitude 2nd longitude
#It returns a cell id at level 12 of this point
#It uses s2-geometry-lib, see here https://github.com/micolous/s2-geometry-library
#Given one level and one position, it should only return one cellid. However,
#if either latitude or longitude is zero then it will return two cellids. So if
#both latitude and longitude are zero it will return four cellids. [maybe a bug]

import sys
from s2 import *

def get_id(latitude, longitude):
  point= S2LatLng.FromDegrees(latitude, longitude)
  place = S2LatLngRect(point, point) #get id only at this point
  coverer = S2RegionCoverer()
  coverer.set_min_level(12); #12 is a good level, 3-6 km^2 area
  coverer.set_max_level(12);
  coverer.set_max_cells(1);
  covering = coverer.GetCovering(place)
  for cellid in covering:
    print cellid.id()
    break #make sure only one cell is return

if __name__ == "__main__":
  latitude = float(sys.argv[1])
  longitude = float(sys.argv[2])
  get_id(latitude, longitude)
