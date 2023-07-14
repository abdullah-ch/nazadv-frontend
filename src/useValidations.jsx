import { useTranslation } from "react-i18next";
import * as Yup from "yup";

const useValidations = () => {
  const { t } = useTranslation("common");

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("validationMessages.tooShort"))
      .max(50, t("validationMessages.tooLong"))
      .required(t("validationMessages.nameRequired")),

    email: Yup.string().email().required(t("validationMessages.emailRequired")),

    password: Yup.string()
      .required(t("validationMessages.passwordIsRequired"))
      .min(6, t("validationMessages.passwordTooShort")),
  });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(t("validationMessages.emailRequired")),

    password: Yup.string()
      .required(t("validationMessages.passwordIsRequired"))
      .min(6, t("validationMessages.passwordTooShort")),
  });

  const addProductSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("validationMessages.tooShort"))
      .max(50, t("validationMessages.tooLong"))
      .required(t("validationMessages.productNameRequired")),

    description: Yup.string()
      .max(1000, t("validationMessages.tooLong"))
      .required(t("validationMessages.descriptionIsRequired")),

    price: Yup.number().required(t("validationMessages.priceIsRequired")),
    category: Yup.string().required(t("validationMessages.categoryIsRequired")),
  });

  return {
    SignUpSchema,
    LoginSchema,
    addProductSchema,
  };
};

export default useValidations;
