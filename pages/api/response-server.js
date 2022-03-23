export default async (req, res) => {
    if(req.method === 'POST'){
        if(!req.body?.slug){
            res.statusCode = 500;
            res.json({message: 'No Slug Provided'});
            res.end();
        }

        res.statusCode = 200;
        res.json({
            originalInput: "firstSlug",
            slug: req.body.slug,
            expiryTime: "1697984931"
        });
        res.end();

    }else{
        res.statusCode = 500;
        res.json({message: 'Invalid HTTP method'});
        res.end();
    }
}
