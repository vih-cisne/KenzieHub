import * as yup from 'yup';

export const schema =yup.object().shape({
    email: yup
      .string()
      .email("Formato de email incorreto")
      .required("E-mail obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "Sua senha deve ter pelo menos 6 caracteres"),
    
});