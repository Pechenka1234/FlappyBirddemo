import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUserName, setGameRunning, resetMaxScore } from '../features/game/gameSlice';
import styles from './UserForm.module.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userName: '',
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted, userName:", data.userName);
    dispatch(setUserName(data.userName));
    dispatch(setGameRunning(true));
    dispatch(resetMaxScore()); // Скидаємо maxScore після входу
  };

  console.log("Rendering UserForm component");
  console.log("UserForm styles:", styles);

  return (
    <div className={styles.userFormOverlay}>
      <form className={styles.userForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Введіть ваше ім'я</h2>
        <input
          {...register('userName', { required: "Ім'я обов'язкове", minLength: { value: 2, message: 'Мінімум 2 символи' } })}
          placeholder="Ваше ім'я"
          className={styles.userFormInput}
        />
        {errors.userName && <p className={styles.userFormError}>{errors.userName.message}</p>}
        <button type="submit" className={styles.userFormButton}>Почати гру</button>
      </form>
    </div>
  );
};

export default UserForm;