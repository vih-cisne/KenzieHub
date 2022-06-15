import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import InputContainer from "../InputContainer";
import { FieldModal, HeaderModal, Modal } from "./styles";

function FormModal({
  tittle,
  onSubmitFunction,
  schema,
  fieldsInputs,
  opened,
  setOpened,
  buttonForm,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  if (opened) {
    return (
      <Modal>
        <div>
          <HeaderModal>
            {tittle}
            <AiOutlineClose onClick={() => setOpened(false)} />
          </HeaderModal>

          <form
            action=""
            onSubmit={(e) => {
              handleSubmit(onSubmitFunction.f)(e);
            }}
          >
            {fieldsInputs.map(({ name, label, field, options, value }, i) => (
              <InputContainer
                value={value}
                key={i}
                error={errors[name]?.message} register={name && register}
                name={name && name}

                label={label}
              >
                {field === "select" && (
                  <select {...register(name)} defaultValue={value}>
                    {options.map((option, i) => (
                      <option key={i}>{option.value}</option>
                    ))}
                  </select>
                )}
              </InputContainer>
            ))}
            <FieldModal>
              {buttonForm.map((button, i) => (
                <Button
                  onClick={button.onClick && button.onClick}
                  type={button.type}
                  bgColor={button.bgColor}
                  key={i}
                >
                  {button.title}
                </Button>
              ))}
            </FieldModal>
          </form>
        </div>
      </Modal>
    );
  }
}

export default FormModal;
