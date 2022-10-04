import {Formik, Field, Form, ErrorMessage, useField} from 'formik';
import * as Yup from 'yup'

//*  Валидация
// const validate = (values) => {
//     const errors = {};
//
// 	if (!values.name || values.name.trim() === '') {
// 		errors.name = 'Required';
// 	} else if (values.name.length < 2) {
// 		errors.name = '2 symbols for name minimum'
// 	}
// 	if (!values.email) {
// 		errors.email = 'Required';
// 	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
// 		errors.email = 'email not valid'
// 	}
// 	if (!values.amount) {
// 		errors.amount = 'input amount'
// 	} else if (!/^[1-9]+\d+/i.test(values.amount)) {
// 		errors.amount = 'amount must not start from zero'
// 	}
// 	return errors;
// }
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


const FormFromReadyComponenets = () => {

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

					<label htmlFor="name">Ваше имя</label>
					<Field
						id="name"
						name="name"
						type="text"

					/>
					<ErrorMessage className="error" name="name" component="div"/>
					<label htmlFor="email">Ваша почта</label>
					<Field
						id="email"
						name="email"
						type="email"
					/>
					<ErrorMessage className="error" name="email" component="div"/>
					<label htmlFor="amount">Количество</label>
					<Field
						id="amount"
						name="amount"
						type="number"

					/>
					<ErrorMessage className="error" name="amount" component="div"/>
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
					<label className="checkbox">
						<Field
							className="checkbox"
							name="terms"
					        type="checkbox"/>
						Соглашаетесь с политикой конфиденциальности?
					</label>
					<ErrorMessage name="terms" className="error" component={"div"}/>
					<button type="submit">Отправить</button>

			</Form>
		</Formik>
	)
}

export default FormFromReadyComponenets;