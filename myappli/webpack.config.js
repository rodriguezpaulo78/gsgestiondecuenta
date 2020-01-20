module.exports={
    //en el proyecto de inicio en src ejecutaras index.js y vas a botar una salida 
    entry:'./src/app/index.js',
    output:{
        //va a ser en la ruta src/public
        path:__dirname+'/src/public',
        filename:'bundle.js'
    },

    //configurar loaders
    module: {
        rules:[
            {
                //usar babel-loader
                use:'babel-loader',
                //setear todos los archivos .js
                test:/\.js$/,
                //excluir
                exclude: /node_modules/,
            },
            {   
                test: /\.css$/, 
                loader: "style-loader!css-loader" 
            }
        ]
    }

};