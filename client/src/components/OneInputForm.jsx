import React, { Component } from "react";
import { Formik, Field } from 'formik';


function OneInputForm(props) {

	return (
		<div>
			<Formik
				initialValues={{ title: '' }}

				onSubmit={(values, { setSubmitting, resetForm }) => {
					let title = values.title;
					props.onFormSubmit(title);
					setSubmitting(false);
					resetForm();
				}}
				validate={values => {
					const errors = {}
					if (!values.title) {
						errors.title = true;
					};
					return errors;
				}}
			>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
					errors
				}) => (
						<form onSubmit={handleSubmit}>
							<Field
								aria-label={props.label}
								type="text"
								name="title"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.title}
								className={errors.title ? 'error' : ''}
								placeholder={props.placeholder}
							/>
							<button type="submit" disabled={isSubmitting}>
								{props.buttonText}
							</button>
						</form>
					)}
			</Formik>
		</div>
	);
}

export default OneInputForm;
