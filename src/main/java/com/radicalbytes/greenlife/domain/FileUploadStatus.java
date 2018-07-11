package com.radicalbytes.greenlife.domain;

public class FileUploadStatus {
	private String status;
	private String message;
	private String imageName;

	public FileUploadStatus() {
		this(null, null, null);
	}

	/**
	 * @return the imageName
	 */
	public String getImageName() {
		return imageName;
	}

	/**
	 * @param imageName the imageName to set
	 */
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public FileUploadStatus(String status, String message, String imageName) {
		setStatus(status);
		setMessage(message);
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
