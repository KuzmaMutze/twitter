import React from 'react';
import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import { useStyles } from '../../pages/SignIn';
import ModalBlock from './Modal';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Color } from '@material-ui/lab/Alert/Alert';
import { Notification } from './../../hoc/withSnakeBar';
import { selectLoadedUserAuth } from '../../redux/selectors/auth-selector';
import { authAPI } from '../../api/api';
import { actions } from '../../redux/reducers/authReducer';
import { LoadingState } from '../../types';

type PropsType = {
  open: boolean;
  handleCloseModal: () => void;
  classes: ReturnType<typeof useStyles>;
};

export type SignUpFormPropsType = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  password2: string;
};

const SignUpSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Введите почту'),
  fullname: yup.string().required('Введите свое полное имя'),
  username: yup.string().required('Введите логин'),
  password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required(),
  password2: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароль не совпадает')
    .required(),
});

export const ModalSignUp: React.FC<PropsType> = ({ handleCloseModal, classes, open }) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectLoadedUserAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormPropsType>({
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (
    handleClick: (text: string, error: Color) => void,
    data: SignUpFormPropsType,
  ) => {
    try {
      const userData = await authAPI.signUp(data);
      dispatch(actions.setFetchUserAC(userData));
      handleClick('Регистрация успешна!', 'success');
      handleCloseModal();
    } catch (error) {
      handleClick('Неверный логин или пароль', 'error');
    }
  };

  return (
    <Notification>
      {(handleClick: (text: string, type: Color) => void) => (
        <ModalBlock title="Создайте учетуню записать" visible={open} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit(onSubmit.bind(this, handleClick))}>
            <FormControl fullWidth>
              <FormGroup row>
                <Controller
                  name="fullname"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="name"
                      type="text"
                      label="Fullname"
                      margin="normal"
                      variant="filled"
                      error={!!errors.fullname}
                      helperText={errors.fullname?.message}
                      value={value}
                      onChange={onChange}
                      autoFocus
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="username"
                      type="text"
                      label="Username"
                      margin="normal"
                      variant="filled"
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      value={value}
                      onChange={onChange}
                      autoFocus
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="email"
                      type="text"
                      label="E-Mail"
                      margin="normal"
                      variant="filled"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      value={value}
                      onChange={onChange}
                      autoFocus
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      margin="normal"
                      variant="filled"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      value={value}
                      onChange={onChange}
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="password2"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="password2"
                      type="password"
                      label="Password"
                      margin="normal"
                      variant="filled"
                      error={!!errors.password2}
                      helperText={errors.password2?.message}
                      value={value}
                      onChange={onChange}
                      fullWidth
                    />
                  )}
                />
              </FormGroup>
              <DialogActions className={classes.dialogActions}>
                <Button onClick={handleCloseModal} color="primary">
                  Отмена
                </Button>
                <Button
                  disabled={isLoaded === LoadingState.LOADING}
                  type="submit"
                  color="primary"
                  variant="contained">
                  Зарегестрироватся
                </Button>
              </DialogActions>
            </FormControl>
          </form>
        </ModalBlock>
      )}
    </Notification>
  );
};
