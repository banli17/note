//
//  XYPoint.m
//  day3
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "XYPoint.h"

@implementation XYPoint
{
    int _x;
    int _y;
}
-(void) setX: (int) x
{
    _x = x;
}
-(void) setY: (int) y
{
    _y = y;
}
-(int) getX
{
    return _x;
}
-(int) getY
{
    return _y;
}
@end
