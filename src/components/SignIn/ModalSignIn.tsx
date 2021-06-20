import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import TextField from '@material-ui/core/TextField/TextField';
import React from 'react';
import { useStyles } from '../../pages/SignIn';
import ModalBlock from './Modal';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { authAPI } from '../../api/api';
import { Color } from '@material-ui/lab/Alert/Alert';
import { Notification } from './../../hoc/withSnakeBar';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/reducers/authReducer';
import { selectLoadedUserAuth } from '../../redux/selectors/auth-selector';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { LoadingState } from '../../types';

type PropsType = {
  open: boolean;
  handleCloseModal: () => void;
  classes: ReturnType<typeof useStyles>;
};

export type SignInFormPropsType = {
  email: string;
  password: string;
};

const SignInSchema = yup.object().shape({
  email: yup.string().email('Неверная почта').required('Введите почту'),
  password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required(),
});

export const ModalSignIn: React.FC<PropsType> = ({ handleCloseModal, classes, open }) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectLoadedUserAuth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormPropsType>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (
    handleClick: (text: string, error: Color) => void,
    data: SignInFormPropsType,
  ) => {
    try {
      const userData = await authAPI.auth(data);
      dispatch(actions.setFetchUserAC(userData));
      handleClick('Авторизация успешна!', 'success');
      handleCloseModal();
    } catch (error) {
      handleClick('Неверный логин или пароль', 'error');
    }
  };

  return (
    <Notification>
      {(handleClick: (text: string, type: Color) => void) => (
        <ModalBlock title="Войти в Twitter" visible={open} onClose={handleCloseModal}>
          <form onSubmit={handleSubmit(onSubmit.bind(this, handleClick))}>
            <FormControl fullWidth>
              <FormGroup row>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      id="email"
                      type="email"
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
                  render={({ field }) => (
                    <TextField
                      id="password"
                      type="password"
                      label="Password"
                      margin="normal"
                      variant="filled"
                      helperText={errors.password?.message}
                      fullWidth
                      error={!!errors.password}
                      {...field}
                    />
                  )}
                  name="password"
                  control={control}
                  defaultValue=""
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
                  {!(isLoaded === LoadingState.LOADED) ? (
                    'Войти'
                  ) : (
                    <CircularProgress style={{ width: 17, height: 17 }} />
                  )}
                </Button>
              </DialogActions>
            </FormControl>
          </form>
        </ModalBlock>
      )}
    </Notification>
  );
};
