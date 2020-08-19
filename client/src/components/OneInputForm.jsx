import React, { Component } from "react";
import { Formik, Field } from 'formik';


class OneInputForm extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Formik
					initialValues={{ title: '' }}

					onSubmit={(values, { setSubmitting, resetForm }) => {
						let title = values.title;
						this.props.onFormSubmit(title);
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
									type="text"
									name="title"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
									className={errors.title ? 'error' : ''}
									placeholder={this.props.placeholder}
								/>
								<button type="submit" disabled={isSubmitting}>
									{this.props.buttonText}
								</button>
							</form>
						)}
				</Formik>
			</div>
		);
	}
}

export default OneInputForm;
