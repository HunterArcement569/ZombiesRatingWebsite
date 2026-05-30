//function for transitioning to the default rating page (create rating)
function CreateRating()
{
    const a = document.createElement("a");
    a.href = "Pages/RatingPage.html?Function=A";
    a.click();
}

//function for transitioning to the edit rating page (edit rating)
function EditRating()
{
    const a = document.createElement("a");
    a.href = "Pages/RatingPage.html?Function=B";
    a.click();
}

//function for transitioning to the view rating page (view rating)
function ViewRating()
{
    const a = document.createElement("a");
    a.href = "Pages/RatingPage.html?Function=C";
    a.click();
}
