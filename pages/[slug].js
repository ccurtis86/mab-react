const SlugCatchAll = ({snippet: {pastebin_value, slug, expiry}}) => {

    return (
        <>
            <p>{pastebin_value}</p>
            <p>{slug}</p>
            <p>{expiry}</p>
        </>
    )
}

export default SlugCatchAll;

export async function getServerSideProps(context) {
    //This is where we would run a fetch request to the server,
    //to check the url is still valid and return the original user input

    //slug would = the word/value in the brackets of file name
    const slug = context.params.slug;

    //now talk to api to get the data and check expiry
    const apiUrl = `http://localhost/api/pastebin/${slug}`;

    //change url to endpoint
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const returnedJson = await response.json();
    const expired = (!returnedJson.expiry || returnedJson.expiry < Math.floor(Date.now()/1000));

    //If expired, tell API to delete record
    if(expired){
        //change url to endpoint
        const deleteResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const deleteReturnedJson = await deleteResponse;
    }

    return {
        notFound: expired,
        props: {
            snippet: returnedJson
        }, // will be passed to the page component as props
    }
}
