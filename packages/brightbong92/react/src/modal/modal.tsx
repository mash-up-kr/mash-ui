"use client";

import { forwardRef, useRef, useState } from "react";
import "./modal.css";

type ModalProps = {};

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ ...props }, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	return (
		<>
			{/* Trigger/Open The Modal */}
			<button
				role="button"
				id="myBtn"
				data-testid="myBtn"
				onClick={() => setIsOpen(true)}
			>
				Open Modal
			</button>

			{/* The Modal */}

			{/* Modal background */}
			<div className={isOpen ? "show background" : "no-show"} />

			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="dialog-title"
				id="myModal"
				className={isOpen ? "show modal" : "no-show"}
			>
				{/* Modal content */}
				{isOpen && (
					<div className="modal-content">
						<div className="modal-header">
							<h2 id="dialog-title">Modal Title</h2>
							<span
								className="close"
								data-testid="closeBtn"
								onClick={() => setIsOpen(false)}
							>
								&times;
							</span>
						</div>

						{/* Modal body */}

						<div className="modal-body">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
								a, sint cumque tempora laudantium modi fugit maxime quos error.
								Similique eligendi, magnam adipisci distinctio veritatis facere!
								Nostrum blanditiis excepturi vitae?
							</p>
						</div>

						{/* Modal footer */}

						<div className="modal-footer">
							<button role="button" onClick={() => setIsOpen(false)}>
								Close
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
});

export default Modal;
