import {Formik, Field, Form, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup'


const CustomTextInput = ({label, ...props}) => {
	const [field, meta] = useField(props)
	return (
		<>
			<label htmlFor={props.name}>{label}</label>
			<input {...props} {...field}/>
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	)
}
const CustomForm = () => {
	return (
		<Formik initialValues={{
			name: '',
			email: '',
			amount: 0,
			currency: '',
			text: '',
			terms: false
		}}
            validationSchema={ Yup.object({
		        name: Yup.string()
			        .min(2, 'строка должна быть минимум 2 символа!')
			        .required('require'),
		        email: Yup.string()
			        .email('email invalid!')
			        .required('require'),
		        amount: Yup.number().required('required')
			        .min(1, 'amount должен быть больше 0'),
		        currency: Yup.string().required('выберите валюту'),
		        text: Yup.string()
			        .min(10, 'не менее 10 символов'),
		        terms: Yup.boolean()
			        .required()
			        .oneOf([true], 'необходимо согласие')

	        })}
	        onSubmit={(values, { setSubmitting }) => {
		        alert(JSON.stringify(values, null, 2));
		        setSubmitting(false);
	        }}>

			<Form className="form">
				<h2>Отправить пожертвование</h2>
				<CustomTextInput
					label="Ваше имя"
					id="name"
					name="name"
					type="text"
				/>

				<CustomTextInput
					label="Ваша почта"
					id="email"
					name="email"
					type="email"
				/>
				<CustomTextInput
					label="Количество"
					id="amount"
					name="amount"
					type="number"
				/>

				<label htmlFor="currency">Валюта</label>
				<Field
					id="currency"
					name="currency"
					as="select">
					<option value="">Выберите валюту</option>
					<option value="USD">USD</option>
					<option value="UAH">UAH</option>
					<option value="RUB">RUB</option>
				</Field>
				<ErrorMessage name="currency" component="div" className={"error"}/>
				<label htmlFor="text">Ваше сообщение</label>
				<Field
					id="text"
					name="text"
					as="textarea"
				/>
				<ErrorMessage className="error" name="text" component={"div"}/>

				<CustomTextInput
					label="Соглашаетесь с политикой конфиденциальности?"
					className="checkbox"
					name="terms"
					type="checkbox"
				/>
				<button type="submit">Отправить</button>

			</Form>
		</Formik>
	)
};

export default CustomForm;
