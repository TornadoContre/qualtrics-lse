Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/
    function reorderSubsets(array) {
        const subsetTrue = array.filter(item => item.subset);
        const subsetFalse = array.filter(item => !item.subset);

        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        const shuffledSubsetTrue = shuffleArray(subsetTrue);

        return [...subsetFalse, ...shuffledSubsetTrue];
    }

   /* Aspects definition */
    // When the subset is setted to "true", it belongs to the subset that will be reordered (randomly) and put at the end.
    var aspectMap = [
		{ "subset": false, "name": "Health", "span": "One’s physical and mental health. This includes not only the absence of acute or chronic disease, but also bodily integrity and good mental and physical health and fitness.", "markers": { "0-25": "Very poor health, for example because of severe acute, recurring, or chronic physical or mental health issues that can’t be cured or treated.", "25-50": "Mediocre health, for example because of acute, recurring, or chronic physical or mental health issues that can’t be fully cured or treated.", "50-75": " Good health, with minor acute, recurring, or chronic physical or mental health issues that can usually be easily cured or treated.", "75-100": "Excellent health, with none or only very minor acute, recurring, or chronic physical or mental health issues that can usually be easily cured or treated." } },
        { "subset": false, "name": "Material Living Standard", "span": "This includes the quality of the private and public built environment, such as the quality of one’s own housing, including appliances and decor. It also includes infrastructure and public services like electricity, water, heating or cooling systems, communication and transport infrastructure, public spaces and buildings, roads, bridges, and tunnels.", "markers": { "0-25": "Very poor quality housing and physical infrastructure, for example no or bare shelter and no or very bad access to public services such as drinking water, electricity, and transport or telecommunications infrastructure.", "25-50": "Mediocre quality housing and physical infrastructure, for example housing that is overcrowded or requiring many repairs  and minimal access or very low quality of public services such as drinking water, electricity, and transport or telecommunications infrastructure.", "50-75": "Good quality housing and physical infrastructure, for example functional housing with some defects and good access and quality of public services such as drinking water, electricity, and transport or telecommunications infrastructure ", "75-100": "Excellent quality housing and physical infrastructure, for example fully functional housing with no or only minor defects and very good access and quality to public services such as drinking water, electricity, and transport or telecommunications infrastructure " } },
        { "subset": false, "name": "Social Relationships", "span": "This includes things such as being able to enjoy the love, care and support of family and friends, being able to respect, value and appreciate people around you, and being able to meet socially with friends, relatives or work colleagues. It may be linked to a sense of belonging, social connectedness, being understood and being part of a family or community. It may also apply to a meaningful relationship with a pet or other animal.", "markers": { "0-25": "To have no or very few and not very fulfilling and meaningful relationships.", "25-50": "To have some, but not very fulfilling and meaningful relationships ", "50-75": "To have fulfilling and meaningful relationships.", "75-100": "To have many very fulfilling and meaningful relationships." } },
        { "subset": false, "name": "Status & Recognition", "span": "This means one’s social status or standing, for example how respected or recognised one is in one’s family or household, among friends, colleagues, one’s community, and society at large. This can have to do with one’s group, one’s identity, or things one has or does.", "markers": { "0-25": "Very low status and recognition, others often look down on you or disrespect you.", "25-50": "Low status and recognition, others sometimes look down on you or disrespect you.", "50-75": "High status and recognition, others usually treat you with respect and as equal. ", "75-100": "Very high status and recognition, others usually treat you with a lot of respect and look up to you." } },
        { "subset": true, "name": "Happiness & Emotional Life", "span": "This includes being or feeling happy, satisfied, and emotionally well. It also means the opposite of being unhappy or unsatisfied. It does not mean in this very moment, but usually and in general.", "markers": { "0-25": "Very unhappy or emotionally unwell, for example because bad and difficult moments or worries, anxieties, and fears do by far outweigh happy and good moments.", "25-50": "Somewhat unhappy or emotionally unwell, for example because bad and difficult moments or worries, anxieties, and fears outweigh happy and good moments.", "50-75": "Mostly happy and emotionally well, for example because happy and good moments outweigh bad and difficult moments. This does not mean the absence of worries, anxieties, or fears, but that good moments dominate.", "75-100": "Very happy and emotionally well, for example because happy and good moments do by far outweigh bad and difficult moments. This does not mean the absence of worries, anxieties, or fears, but that good moments dominate by a lot." } },
        { "subset": false, "name": "Safety & Security", "span": "This means being and feeling safe from crime, war, terror, or other forms of violence and insecurity, including not being assaulted.", "markers": { "0-25": "Not at all safe and secure, for example because of frequent experience of or exposure to crime and violence.", "25-50": "Not very safe and secure, for example because of occasional experience of or exposure to crime and violence.", "50-75": "Mostly safe and secure, for example because of rare experience of or exposure to crime and violence.", "75-100": "Very safe and secure, for example because of no experience of or exposure to crime and violence." } },
        { "subset": false, "name": "Income & Financial Security", "span": "This means earning or having enough money or other resources, such as property or material and financial assets, to support oneself financially. It also includes not having to worry about one’s financial security because of one’s own financial position or because one can count on others’ or the government’s support. It does not mean one’s income or financial position relative to others.", "markers": { "0-25": "Insufficient income and financial security, for example because one does not earn or receive enough money to make ends meet and cannot save and plan for the future.", "25-50": "Barely sufficient income and financial security, for example because one’s income means sometimes struggling to make ends meet and little possibility to save and plan for the future.", "50-75": "Sufficient income and financial security, for example because one does not usually struggle to make ends meet and is able to save and plan for the future.", "75-100": "More than sufficient income and financial security, for example because one never struggles to make ends meet and is very able to save and plan for the future." } },
        { "subset": false, "name": "Leisure, Free Time & Hobbies", "span": "This means enjoying time free from work or other duties, including household and care responsibilities. It includes being able to pursue hobbies or having free time for oneself. It also includes what falls under so-called 'work-life-balance'.", "markers": { "0-25": "No or very little leisure, free time, and hobbies, for example not having enough time for oneself and no or very few opportunities to pursue leisure activities or hobbies.", "25-50": "Some leisure, free time and hobbies, for example regularly having some, but not a lot of time for oneself and being able to sometimes (up to once a week)  pursue leisure activities or hobbies.", "50-75": "A good deal of leisure, free time, and hobbies, for example regularly having enough time for oneself and being able to regularly (more than once a week) pursue leisure activities or hobbies.", "75-100": "A lot of leisure, free time and hobbies, for example having a lot of time for oneself and a lot of time (daily) to pursue leisure activities or hobbies." } },
        { "subset": false, "name": "Voice & Political Participation", "span": "This means the capacity to speak up and be heard, from homes to houses of parliament, and to shape and share in discussions, discourse, and decisions that affect them. This includes being able to influence decisions affecting one’s country and/or local area.", "markers": { "0-25": "No or very few possibilities for political action and participation, for example not being able to vote or influence decisions affecting national or local politics and organisation.", "25-50": "Some possibilities for political action and participation, for example being able to vote and otherwise influence some national or local decision-making processes as individual or through collective action.", "50-75": "A good deal of possibilities for political action and participation, for example being able to vote and otherwise influence a good deal of national or local decision-making processes as individual or through collective action.", "75-100": "A lot of possibilities for political action and participation, for example being able to vote and otherwise influence many national or local decision-making processes, through active politics or impactful individual or collective action." } },
        { "subset": false, "name": "Agency, Self-Determination & Control over one's life", "span": "This means the capacity to make decisions about one’s own life and act on them to achieve a desired outcome, free of violence, retribution, or fear. This includes being able to decide for yourself how to live your life. For example, to pursue your own goals in line with your aims and values, rather than being determined by others. It also includes the freedom to move by yourself and to meet and associate with others based on your own choice.", "markers": { "0-25": "No or very limited agency and self-determination, for example most decisions about one’s life being made by others.", "25-50": "Some agency and self-determination, for example being able to make some decisions about one’s life oneself but many being made by others.", "50-75": "A good deal of agency and self-determination, for example being able to make most decisions about one’s life oneself and in line with one’s aims and values, but some being made by others.", "75-100": "A lot of agency and self-determination, for example being able to make all or almost all decisions about one’s life oneself and in line with one’s aims and values." } },
        { "subset": false, "name": "Education, Knowledge & Understanding", "span": "This includes formal and informal education, such as schooling, technical education, or college/university. It also includes having and being able to gain new knowledge and understanding about the world. Basic and advanced literacy and numeracy are included in this as much as general and subject-specific skills and knowledge.", "markers": { "0-25": "Very little education, knowledge and understanding, for example no formal schooling, no or very limited understanding of how to navigate one’s social, political, and economic environment, and no or very limited possibilities and knowledge of how to learn new things.", "25-50": "Some education, knowledge and understanding, for example basic formal schooling, some understanding of how to navigate one’s social, political, and economic environment, and some possibilities and knowledge of how to learn new things.", "50-75": "A good deal of education, knowledge and understanding, for example formal high school education, a good understanding of how to navigate one’s social, political, and economic environment, and several possibilities and knowledge of how to learn new things.", "75-100": "A lot of education, knowledge and understanding, for example education up to the level of college or university, a very good understanding of how to navigate one’s social, political, and economic environment, and excellent possibilities and knowledge of how to learn new things." } },
        { "subset": false, "name": "Sense of Purpose and Meaningful Activities", "span": "An activity or occupation may be purposeful, meaningful or rewarding for example because it is in line with one's values, because it allows doing something for others, channels creativity, or because it is (in a positive sense) challenging, creates a sense of security and stability,  or is enjoyable and fulfilling for another reason.", "markers": { "0-25": "No or very little meaningful occupation, for example being unemployed or having a job one does not find any meaning or reward in, and no or very few other meaningful occupation.", "25-50": "Some meaningful occupation, for example a job that can sometimes be rewarding or other sometimes meaningful occupation.", "50-75": "A good deal of meaningful occupation, for example a job that is mostly rewarding or other mostly meaningful occupation.", "75-100": "A lot of meaningful occupation, for example a very rewarding job or other meaningful occupation." } },
        {"subset": false, "name": "Freedom from Discrimination & Repression", "span": "This includes being able to live one’s identity freely and openly, including one’s gender, ethnic, and sexual identity, and to express one’s views, including political and religious views without having to fear discrimination or repression.", "markers": { "0-25": " It is impossible or very difficult to freely and openly live one’s identity without discrimination or repression ", "25-50": " It is very difficult to freely and openly live one’s identity without discrimination or repression ", "50-75": " It is not always, but mostly possible to freely and openly live one’s identity without discrimination or repression.", "75-100": " It is no problem to freely and openly live one’s identity without discrimination or repression." } },
        { "subset": false, "name": "Quality of the Natural Environment", "span": "This includes the presence, diversity and quality of green spaces, such as mountains, canyons, forests, meadows and grasslands, and larger parks, but also wildlife and animals as well as rivers, lakes, coastal areas, and the quality of the air in your area. Absence, pollution and destruction mean lower quality of the natural environment.", "markers": { "0-25": "There is no natural environment or it is of very poor quality/very polluted or destroyed.", "25-50": "There is some natural environment, but not a lot and/or of rather poor quality/somewhat polluted or destroyed.", "50-75": "There is good quality natural environment, even if somewhat polluted/destructed.", "75-100": "There is a lot of good quality natural environment, with very little or no pollution or destruction." } },
    ]

    const otherArray = [
        { "name": "Other (please specify)", "span": "" },
        { "name": "Other (please specify)", "span": "" },
    ]
    aspectMap = reorderSubsets(aspectMap);
    aspectMap = [...aspectMap, ...otherArray];

    var aspectMapString = JSON.stringify(aspectMap);
    Qualtrics.SurveyEngine.setEmbeddedData('aspectMapString', aspectMapString);

    const namePrefix = "aspectName";
    const spanPrefix = "aspectSpan";
    aspectMap.map(function (element, idx) {
        let i = idx + 1;
        Qualtrics.SurveyEngine.setEmbeddedData(namePrefix + i, element["name"]);
        Qualtrics.SurveyEngine.setEmbeddedData(spanPrefix + i, element["span"]);
        i++
    })
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});