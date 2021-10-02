import {
	FormWrapper,
	FormHeading,
	FormControler,
	FormLabeling,
	FormSelect,
	SelectOption,
	FormInput,
	FormButton,
	FormTextArea
} from './_PostForm.styles'

export default function NewPost ({ children, ...props })
{
	return <FormWrapper { ...props }>{children}</FormWrapper>
}

NewPost.FormHeading = function NewPostFormHeading ({ children, ...props })
{
	return <FormHeading { ...props }>{children}</FormHeading>
}

NewPost.FormControler = function NewPostFormControler ({ children, ...props })
{
	return <FormControler { ...props }>{children}</FormControler>
}

NewPost.FormLabeling = function NewPostFormLabeling ({ children, ...props })
{
	return <FormLabeling { ...props }>{children}</FormLabeling>
}

NewPost.FormSelect = function NewPostFormSelect ({ children, ...props })
{
	return <FormSelect { ...props }>{children}</FormSelect>
}

NewPost.SelectOption = function NewPostSelectOption ({ children, ...props })
{
	return <SelectOption { ...props }>{children}</SelectOption>
}

NewPost.FormInput = function NewPostFormInput ({ children, ...props })
{
	return <FormInput { ...props }>{children}</FormInput>
}

NewPost.FormButton = function NewPostFormButton ({ children, ...props })
{
	return <FormButton { ...props }>{children}</FormButton>
}

NewPost.FormTextArea = function NewPostFormTextArea ({ children, ...props })
{
	return <FormTextArea { ...props }>{children}</FormTextArea>
}
