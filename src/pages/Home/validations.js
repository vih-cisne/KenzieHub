import * as yup from 'yup';

export const schemaRegisterTech =  yup.object().shape({
    title: yup
      .string()
      .required("Informe o nome da tecnologia"),
    status: yup
      .string()
      .required("Campo obrigatório") 
});



export const schemaUpdateTech = yup.object().shape({
    title: yup
      .string(),
      //.required("Informe o nome da tecnologia"),
    status: yup
      .string()
      .required("Altere o status")   
})
