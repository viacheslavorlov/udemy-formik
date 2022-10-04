import {useFormik} from "formik";
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


const Form = () => {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			amount: 0,
			currency: '',
			text: '',
			terms: false
		},
		validationSchema: Yup.object({
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

		}),
		onSubmit: values => console.log(JSON.stringify(values, null, 2))
	})
	return (
		<form className="form" onSubmit={formik.handleSubmit}>
			<h2>Отправить пожертвование</h2>
			<label htmlFor="name">Ваше имя</label>
			<input
				id="name"
				name="name"
				type="text"
				{...formik.getFieldProps('name')}
			/>
			{formik.errors.name && formik.touched.name ? <div className={'error'}>{formik.errors.name}</div> : null}
			<label htmlFor="email">Ваша почта</label>
			<input
				id="email"
				name="email"
				type="email"
				value={formik.values.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			{formik.errors.email && formik.touched.email ? <div className={'error'}>{formik.errors.email}</div> : null}
			<label htmlFor="amount">Количество</label>
			<input
				id="amount"
				name="amount"
				type="number"
				value={formik.values.amount}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			{formik.errors.amount && formik.touched.amount ? <div className={'error'}>{formik.errors.amount}</div> : null}
			<label htmlFor="currency">Валюта</label>
			<select
				id="currency"
				name="currency"
				value={formik.values.currency}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}>
				<option value="">Выберите валюту</option>
				<option value="USD">USD</option>
				<option value="UAH">UAH</option>
				<option value="RUB">RUB</option>
			</select>
			{formik.errors.currency && formik.touched.currency ? <div className={'error'}>{formik.errors.currency}</div> : null}
			<label htmlFor="text">Ваше сообщение</label>
			<textarea
				id="text"
				name="text"
				value={formik.values.text}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			{formik.errors.text && formik.touched.text ? <div className={'error'}>{formik.errors.text}</div> : null}
			<label className="checkbox">
				<input name="terms"
				       type="checkbox"
				       value={formik.values.terms}
				       onChange={formik.handleChange}
				       onBlur={formik.handleBlur}/>
				Соглашаетесь с политикой конфиденциальности?
			</label>
			{formik.errors.terms && formik.touched.terms ? <div className={'error'}>{formik.errors.terms}</div> : null}
			<button type="submit">Отправить</button>
		</form>
	)
}

export default Form;