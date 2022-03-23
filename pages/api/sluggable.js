import * as randomString from 'randomString';

export default async (req, res) => {
    if(req.method === 'POST'){
        if(!req.body?.userString){
            res.statusCode = 200;
            res.json({message: 'No Input Provided'});
            res.end();
        }
        /* We hav user input so now lets create the slug to be return too */
        const slug = randomString.generate(16);

        //now make a post request to he api endpoint
        const response = await fetch('http://localhost/api/pastebin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                slug,
                userString: req.body.userString}
            )
        });

        const returnedJson = await response.json();


        //close this request
        res.statusCode = 200;
        res.json({...req.body, slug, returnedJson});
        res.end();

    }else{
        console.log('500 - no userString');
        res.statusCode = 500;
        res.json({message: 'Invalid HTTP method'});
        res.end();
    }
}
