import React, { Component } from "react";
import { Formik, Field } from 'formik';


class ListsForm extends Component {
	constructor(props) {
		super(props)
		this.onFormSubmit = this.props.onFormSubmit;
	}

	render() {
		return (
			<div className="listsForm">
				<Formik
					initialValues={{ title: '' }}

					onSubmit={(values, { setSubmitting, resetForm }) => {
						let title = values.title;
						this.onFormSubmit(title);
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
									placeholder="List title"
								/>
								<button type="submit" disabled={isSubmitting}>
									Add list
           		</button>
							</form>
						)}
				</Formik>
			</div>
		);
	}
}

export default ListsForm;
