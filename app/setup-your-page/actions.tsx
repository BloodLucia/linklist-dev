'use server'

export const uploadProfilePicture = async (formData: FormData) => {
  // const file = File(formData.get("file")[0]) as File
  const file = formData.get('file') as File
  console.log(file)
}
