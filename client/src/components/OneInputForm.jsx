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
				>
					{({
						values,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
							<form onSubmit={handleSubmit}>
								<Field
									type="text"
									name="title"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
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
