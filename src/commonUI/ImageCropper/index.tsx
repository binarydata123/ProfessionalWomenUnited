'use client';
import React, {useState} from 'react';
import Avatar from 'react-avatar-edit';
import './editor.css';

interface Props {
	image?: any;
	onCroppedImage: (data: string | null) => void;
	open?: boolean;
}

const ImageCropper = ({image, onCroppedImage}: Props) => {
	const [preview, setPreview] = useState<any>('');
	const [closeCropper, setcloseCropper] = useState(false);

	const src = image;

	const onClose = () => {
		setPreview(null);
	};

	const onToggleChanges = (isTrue: boolean) => {
		if (isTrue) {
			onCroppedImage(preview);
		} else {
			onCroppedImage(null);
		}
		setcloseCropper(true);
	};

	const onCrop = (preview: any) => {
		setPreview(preview);
	};

	const onBeforeFileLoad = (elem: any) => {
		if (elem.target.files[0].size > 77771680) {
			alert('File is too big!');
			elem.target.value = '';
		}
	};

	return (
		<div className={`modal show`} style={{display: 'block'}} role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Modal title</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="image-editor-wrapper">
							<Avatar
								width={470}
								height={295}
								onCrop={onCrop}
								onClose={onClose}
								onBeforeFileLoad={onBeforeFileLoad}
								src={src}
							/>
							<img src={preview} alt="Preview" />
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-primary" onClick={e => onToggleChanges(true)}>
							Save changes
						</button>
						<button type="button" className="btn btn-secondary" onClick={e => onToggleChanges(false)}>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageCropper;
