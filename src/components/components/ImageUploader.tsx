import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { bytesToSize } from "../../utils/format";

interface ThumbnailImageProps {
	name: string;
	src: string;
	size: number;
	style?: React.CSSProperties;
}

interface MultipleImageUploaderProps {
	value?: Array<{ file: File; image: string; remove?: boolean }>;
	onError?: (error: string | null) => void;
	onClear?: () => void;
	reset?: any;
	onFilesChange?: (files: File[]) => void;
}

interface FileWithPreview {
	file: File;
	image: string;
}

const uploadState = Object.freeze({
	BEFORE: "before",
	HOVER: "hover",
	AFTER: "after",
} as const);

type UploadStateType = (typeof uploadState)[keyof typeof uploadState];

function ThumbnailImage(props: ThumbnailImageProps) {
	return (
		<div>
			<img {...props} style={{ width: 100 }} />
			<p>
				{props.name} <span style={{ whiteSpace: "none" }}>({bytesToSize(props.size)})</span>
			</p>
		</div>
	);
}

export function ImageUploader() {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
		clearErrors,
		setError,
	} = useFormContext();
	const up = watch("uploader");

	useEffect(() => {
		register("uploader", { required: true });
	}, [register]);

	return (
		<div>
			<span className="form-error" style={{ bottom: 2, top: "unset" }}>
				{errors.uploader?.type === "required" && "At least 1 image is required!"}
				{errors.uploader?.type === "custom" && errors.uploader.message?.toString()}
			</span>
			<MultipleImageUploader
				reset={up}
				onError={(data: string | null) => {
					if (!data) {
						setValue("uploader", { files: [] });
						clearErrors("uploader");
					} else {
						setError("uploader", {
							type: "custom",
							message: data,
						});
					}
				}}
				onClear={() => {
					setValue("uploader", { files: [] });
					clearErrors("uploader");
				}}
				onFilesChange={(files) => {
					setValue("uploader", { files });
				}}
			/>
		</div>
	);
}

export function MultipleImageUploader(props: MultipleImageUploaderProps) {
	const [currentUploadState, setUploadState] = React.useState<UploadStateType>(uploadState.BEFORE);
	const [images, setImages] = React.useState<Array<{ file: File; image: string; remove?: boolean }>>(
		props.value || []
	);
	const [files, setFiles] = React.useState<FileWithPreview[]>([]);
	const [counter, setCounter] = React.useState(0);
	console.log("files", files);
	const dropzoneElement = React.useRef<HTMLDivElement>(null);
	const imageInputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const element = dropzoneElement.current;
		if (!element) return;

		const handleDragEnter = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dragEnter();
		};

		const handleDragLeave = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			dragLeave();
		};

		const handleDragOver = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
		};

		const handleDrop = (e: DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setCounter(0);
			const droppedFiles = e.dataTransfer?.files;
			if (!droppedFiles) return;

			setFiles([]);
			setUploadState(uploadState.AFTER);

			const newFiles: File[] = [];
			for (let i = 0; i < droppedFiles.length; i++) {
				const reader = new FileReader();
				reader.onload = (event) => {
					if (!event.target) return;
					const check = onFileChange([
						...files,
						{ file: droppedFiles[i], image: event.target.result as string },
					]);
					if (check) {
						newFiles.push(droppedFiles[i]);
						if (imageInputRef.current) {
							imageInputRef.current.files = droppedFiles;
						}
						setFiles([]);
					}
					// Notify parent of file changes
					if (props.onFilesChange) {
						props.onFilesChange(newFiles);
					}
				};
				reader.readAsDataURL(droppedFiles[i]);
			}
			if (imageInputRef.current) {
				imageInputRef.current.files = droppedFiles;
			}
		};

		element.addEventListener("dragenter", handleDragEnter, false);
		element.addEventListener("dragleave", handleDragLeave, false);
		element.addEventListener("dragover", handleDragOver, false);
		element.addEventListener("drop", handleDrop, false);

		return () => {
			element.removeEventListener("dragenter", handleDragEnter);
			element.removeEventListener("dragleave", handleDragLeave);
			element.removeEventListener("dragover", handleDragOver);
			element.removeEventListener("drop", handleDrop);
		};
	}, [files]);

	const dragEnter = () => {
		setCounter((prev) => prev + 1);
		setUploadState(uploadState.HOVER);
	};

	const dragLeave = () => {
		setCounter((prev) => {
			if (prev - 1 === 0) {
				setUploadState(uploadState.BEFORE);
				return 0;
			}
			return prev - 1;
		});
	};

	const clickRemoveImage = (i: number) => {
		const sources = [...images];
		sources[i].remove = !sources[i].remove;
		setImages(sources);
	};

	const clickRemoveFile = () => {
		setFiles([]);
		if (imageInputRef.current) {
			imageInputRef.current.value = "";
		}
		props.onClear?.();
	};

	const checkValid = (filesInner: FileWithPreview[]): string | null => {
		if (!filesInner) return null;
		if (filesInner.length >= 10) return "you can't send more than 10 images";
		for (let i = 0; i < filesInner.length; i++) {
			const file = filesInner[i].file;
			const split = file.name.split(".");
			if (!["png", "jpg", "jpeg"].includes(split[split.length - 1])) {
				return `Extension of the file can only be "png", "jpg" or "jpeg" `;
			}
			if (file) {
				if (file.size > 1048576) {
					return `Size of "${file.name}" can't be bigger than 1mb`;
				}
			}
		}
		return null;
	};

	const onFileChange = (filesInner: FileWithPreview[]): string | null => {
		const check = checkValid(filesInner);
		if (!check) {
			setFiles(filesInner);
		}
		props.onError?.(check);
		return check;
	};

	const renderImages = () => {
		const imageElements = [];
		if (files) {
			console.log("---->", files);
			for (let i = 0; i < files.length; i++) {
				let imageClassName = "image";
				imageElements.push(
					<div key={i} className="image-container">
						<div className={imageClassName}>
							<ThumbnailImage name={files[i].file.name} src={files[i].image} size={files[i].file.size} />
						</div>
					</div>
				);
			}
		}
		return imageElements;
	};

	return (
		<div ref={dropzoneElement} className={"multi-image form-element dropzone " + currentUploadState}>
			<input ref={imageInputRef} type="file" style={{ display: "none" }} className="target" name={"file"} />
			<div className="container">
				<button className="trash" onClick={clickRemoveFile} type="button">
					Delete All
				</button>
				{renderImages()}
				<div>
					<button
						type={"button"}
						onClick={() => {
							const fileInput = document.getElementById("file__") as HTMLInputElement;
							if (fileInput) {
								fileInput.click();
							}
						}}
						className="plus">
						<span>
							+ Add Image
							<p>Drag image here or Select Image</p>
						</span>
					</button>
				</div>
				<input
					hidden
					id={"file__"}
					multiple
					type={"file"}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						const selectedFiles = event.target.files;
						if (!selectedFiles) return;

						setFiles([]);
						setUploadState(uploadState.AFTER);
						for (let i = 0; i < selectedFiles.length; i++) {
							const reader = new FileReader();
							reader.onload = (eventInner) => {
								if (!eventInner.target) return;
								onFileChange([
									...files,
									{ file: selectedFiles[i], image: eventInner.target.result as string },
								]);
							};
							reader.readAsDataURL(selectedFiles[i]);
						}
						if (imageInputRef.current) {
							imageInputRef.current.files = selectedFiles;
						}
					}}
				/>
			</div>
		</div>
	);
}
