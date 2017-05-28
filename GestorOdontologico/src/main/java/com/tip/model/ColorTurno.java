package com.tip.model;

public class ColorTurno {
	
	
	private String primary;
	private String secondary;
	
	public ColorTurno(){
		this.setPrimary("#ad2121");
		this.setSecondary("#fae3e3");
	}
	
	public String getPrimary() {
		return primary;
	}
	public void setPrimary(String primary) {
		this.primary = primary;
	}
	public String getSecondary() {
		return secondary;
	}
	public void setSecondary(String secondary) {
		this.secondary = secondary;
	}
	
	

}
