// Docdefinition for Outstanding Register

var ddfileIndx = {
    pageSize: 'A4',
    pageMargins: [ 30, 10, 10, 10 ],
    footer: function(currentPage, pageCount) { 
        return {
            columns: [
            {
                fontSize: 9,
                text:[
                {
                text: '--------------------------------------------------------------------------' +
                '\n',
                margin: [0, 20]
                },
                {
                text: '© A. V. Solutions    -- Page ' + currentPage.toString() + ' of ' + pageCount,
                }
                ],
                alignment: 'center'
            }
            ]
        };
    },    

    content: [
        {text: 'H. B. Gala & Co. & Associated Firms', style: 'CoName' ,  alignment: 'center', border: [false, false, false, false]},
        {text: 'File Index', style: 'header',  alignment: 'center',  border: [false, false, false, false]},
        {
			alignment: 'justify',
			columns: [
				{
					text: '<<FILE_NO>>  <<FILE_NAME>>'
				},
				{
                    text: '<<FILE_NO1>>  <<FILE_NAME1>>'
				}
			]
		},          
    ],
    styles: {
        header: {
            fontSize: 12,
            bold: true,
            margin: [0, 0, 0, 10]
        },
        copyrights: {
            fontSize: 10,
            bold: false,
            italics: true,
            margin: [0, 0, 0, 10]
        },
        subheader: {
            fontSize: 8,
            bold: false,
        },
        tableExample: {
            margin: [0, 5, 0, 15]
        },
        tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black'
        },
        GrpName: {
            bold: true,
            fontSize: 10,
            decoration: 'underline'
        },

        CoName: {
            bold: true,
            fontSize: 18,
            color: 'black'
        }
    },
    defaultStyle: {
        fontSize: 10,
        columnGap: 20
        // alignment: 'justify'
    }   
};

