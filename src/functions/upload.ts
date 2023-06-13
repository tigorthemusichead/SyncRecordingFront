const uploadFile = async (recordingBlob: Blob) => {
    const file = new File([recordingBlob], 'recorded-file.mp3', {
        type: 'audio/mp3'
    })
    const formData = new FormData()
    formData.append('file', file)
    fetch(`${process.env.REACT_APP_API_URL}/uploadFile`, {
        method: 'POST',
        body: formData,
    })
        .then(async (response) => {
            const responseJSON = await response.json()
            console.log(responseJSON)
        })
        .catch((error) => {
            console.error(error)
        })
}

export default uploadFile