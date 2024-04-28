const handleUpload = (photo, id, type) => {

    if (photo) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataUrl = event.target.result;
            const imageData = dataUrl.split(',')[1];
            const imageSrc = `data:image/png;base64,${imageData}`
            Meteor.call('photos.insert', { id: id, imageSrc: imageSrc, type: type })
        };
        reader.readAsDataURL(photo);
    }
};

export default handleUpload;