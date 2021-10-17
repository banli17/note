//
//  main.cpp
//  test-imagemagick
//
//  Created by banli on 09/10/2021.
//  Copyright © 2021 banli. All rights reserved.
//

#include <Magick++.h>
#include <iostream>

using namespace std;
using namespace Magick;

int main(int argc,char **argv)
{
    InitializeMagick(*argv);

    // Construct the image object. Seperating image construction from the
    // the read operation ensures that a failure to read the image file
    // doesn't render the image object useless.

    Image image;
    try {

        // Read a file into image object
        image.read( "/Users/banli/Desktop/learn/cpp/complex/assets/a.jpg" );

        // Crop the image to specified size (width, height, xOffset, yOffset)
        image.crop( Geometry(100,100, 100, 100) );

        // Write the image to a file

        image.write( "/Users/banli/Desktop/learn/cpp/complex/assets/a1.jpg" );
    }
    catch( Exception &error_ )
    {
        cout << "Caught exception: " << error_.what() << endl;
        return 1;
    }
    return 0;
}
