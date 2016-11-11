function changeDescrip(type, num) {
    var descripBox = document.getElementsByClassName('descripBox');
    console.log(type);
    switch (type) {
    case "circumfrence":
        if (num === 0) {
            descripBox[0].innerHTML = "In order to calculate the circumference of a circle, all you need is ‘r’  or the radius of the circle. The formula is  π x (2 x r). π is about 3.14 in case you only need a close answer.";
        } else if (num === 1) {
            descripBox[0].innerHTML = "The perimeter of a circle, often called the circumference, is proportional to its diameter and its radius. That is to say, there exists a constant number pi, π (the Greek p for perimeter).";
        } else {
            descripBox[0].innerHTML = "Circumference does not serve very much purpose in today's society. However, understanding perimeter will help understand other math concepts such as area of a circle.";
        }
        break;

    case "circArea":
        if (num === 0) {
            descripBox[0].innerHTML = "In order to calculate the Area of a circle, all you need is ‘r’  or the radius of the circle. The formula is  π x (r x r). π is about 3.14 in case you only need a close answer.";
        } else if (num === 1) {
            descripBox[0].innerHTML = "In the 5th century BCE, Hippocrates of Chios was the first to show that the area of a disk (the region enclosed by a circle) is proportional to the square of its diameter, as part of his quadrature of the lune of Hippocrates, but did not identify the constant of proportionality. ";
        } else {
            descripBox[0].innerHTML = "Area is used to see how much space is in a circle. This can be used for planning in blueprints.";
        }
        break;

    case "perimeter":
        if (num === 0) {
            descripBox[0].innerHTML = "Say you have a shape with 5 sides or 10 sides. No matter how it looks, it still have a measureable perimeter.  If a rectangle has a width of 2 and a length of 4, you would then add it up like this. 4+4+2+2 = 12. ";
        } else if (num === 1) {
            descripBox[0].innerHTML = "The word comes from the Greek peri (around) and meter (measure). The term may be used either for the path or its length and it can be thought of as the length of the outline of a shape.";
        } else {
            descripBox[0].innerHTML = "Perimeter does not serve very much purpose in today's society. However, understanding perimeter will help understand other math concepts such as area.";
        }
        break;

    case "rectArea":
        if (num === 0) {
            descripBox[0].innerHTML = "To calculate the area of a rectangle, the formula goes like this. Width x Length. So if a rectangle as a width of 2 and a length of 4,  2 x 4 = 8.";
        } else if (num === 1) {
            descripBox[0].innerHTML = "In the 7th century CE, Brahmagupta developed a formula, now known as Brahmagupta's formula, for the area of a cyclic quadrilateral (a quadrilateral inscribed in a circle) in terms of its sides.";
        } else {
            descripBox[0].innerHTML = "Area is used to see how much space is in a certain shape. This can be used for planning in blueprints.";
        }
        break;

    case "prismSA":
           if (num === 0) {
            descripBox[0].innerHTML = "Though a long process, the formula of a right rectangular prism makes a lot of sense. 2(w x l + h x l + h x w) After getting all the measurements for a right rectangular prism, you need the area of all the different rectangles and since there will be two of each type, we can know the total surface area.";
        } else if (num === 1) {
            descripBox[0].innerHTML = "A general definition of surface area was sought by Henri Lebesgue and Hermann Minkowski at the turn of the twentieth century. Their work led to the development of geometric measure theory, which studies various notions of surface area for irregular objects of any dimension.";
        } else {
            descripBox[0].innerHTML = "Surface area is important in chemical kinetics. Increasing the surface area of a substance generally increases the rate of a chemical reaction.";
        } 
        break;

    case "prismVol":
if (num === 0) {
            descripBox[0].innerHTML = "Think of area of a rectangle. Now think of that formula but add height to the equation. That is exactly how you can calculate volume of a right rectangular prism. W x L x H. ";
        } else if (num === 1) {
            descripBox[0].innerHTML = "Three dimensional mathematical shapes are also assigned volumes. Volumes of some simple shapes, such as regular, straight-edged, and circular shapes can be easily calculated using arithmetic formulas.";
        } else {
            descripBox[0].innerHTML = "In thermodynamics, the volume of a system is an important extensive parameter for describing its thermodynamic state. The specific volume, an intensive property, is the system's volume per unit of mass.";
        }
        break;

    case "sphereSA":
if (num === 0) {
            descripBox[0].innerHTML = "In order to calculate the circumference of a sphere, all you need is ‘r’  or the radius of the sphere. 4π x (r x r) or 4π x r^2.";
        } else if (num === 1) {
            descripBox[0].innerHTML = "Archimedes first derived this formula from the fact that the projection to the lateral surface of a circumscribed cylinder is area-preserving.";
        } else {
            descripBox[0].innerHTML = "Surface area is important in chemical kinetics. Increasing the surface area of a substance generally increases the rate of a chemical reaction. ";
        }
        break;

    case "sphereVol":
if (num === 0) {
            descripBox[0].innerHTML = "In order to calculate the volume of a sphere, all you need is ‘r’  or the radius of the sphere. 4/3 x π x (r x r x r) or 4/3 x π x r^3.";
        } else if (num === 1) {
            descripBox[0].innerHTML = " Archimedes first derived this formula, which shows that the volume inside a sphere is 2/3 that of a circumscribed cylinder. ";
        } else {
            descripBox[0].innerHTML = "In thermodynamics, the volume of a system is an important extensive parameter for describing its thermodynamic state. The specific volume, an intensive property, is the system's volume per unit of mass.";
        }
        break;
    }

}