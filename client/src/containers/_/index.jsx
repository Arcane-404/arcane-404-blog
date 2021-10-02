import NewPost from './_PostForm.jsx'
import { SelectOption } from './_PostForm.styles.js'

export default function NewPostForm () {
	return (
		<NewPost>
    	<NewPost.FormHeading>Create New Post</NewPost.FormHeading>
    	<NewPost.FormControler isRequired>
      	<NewPost.FormLabeling>Topic</NewPost.FormLabeling>
      	<NewPost.FormSelect placeholder="Select Topic">
					<NewPost.SelectOption value="option1">Front-end</NewPost.SelectOption>
					<NewPost.SelectOption value="option2">Back-end</NewPost.SelectOption>
					<NewPost.SelectOption value="option3">UX/UI</NewPost.SelectOption>
					<NewPost.SelectOption value="option3">Database</NewPost.SelectOption>
					<NewPost.SelectOption value="option3">Design</NewPost.SelectOption>
      	</NewPost.FormSelect>
    	</NewPost.FormControler>
    	<NewPost.FormControler isRequired>
      	<NewPost.FormLabeling>Title</NewPost.FormLabeling>
      	<NewPost.FormInput type="text" />
    	</NewPost.FormControler>
    	<NewPost.FormControler isRequired>
      	<NewPost.FormLabeling>Description</NewPost.FormLabeling>
      	<NewPost.FormTextArea />
    	</NewPost.FormControler>
    	<NewPost.FormControler>
      	<NewPost.FormLabeling>Tags</NewPost.FormLabeling>
      	<NewPost.FormInput type="text" />
    	</NewPost.FormControler>
    	<NewPost.FormButton>Submit</NewPost.FormButton>
  	</NewPost>
	)
}
