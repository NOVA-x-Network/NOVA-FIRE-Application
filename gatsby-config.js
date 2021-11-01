module.exports = {
    siteMetadata: {
        title: "NOVA-FIRE-Application",
        siteUrl: "https://NOVA-FIRE-TEST.com"
    },
    plugins: [
        "gatsby-plugin-sharp",
        "gatsby-plugin-sitemap",
        "gatsby-transformer-sharp",
	`gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "components",
                path: "./src/components/",
            },
            __key: "components",
        },
    ],
};
