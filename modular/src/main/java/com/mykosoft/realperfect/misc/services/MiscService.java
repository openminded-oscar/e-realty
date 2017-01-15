package com.mykosoft.realperfect.misc.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mykosoft.realperfect.model.Region;

@Service
public class MiscService {
	public List<Region> getAllRegions() {
		return Arrays.asList(Region.values());	
	}
}
