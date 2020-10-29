//
//  Person.h
//  ios_demo
//
//  Created by banli on 21/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

// 类内使用成员变量，类外使用属性，属性就是成员变量的外部接口
@interface Person : NSObject
{
    // 默认是私有的，可以在类内使用
    // 可以加 @public 来变成公有
    NSString *_name;  // 名字
    int _age;  // 年龄
    int _sex;  // 性别
}
@property(nonatomic, strong) NSString *personName;
@end

NS_ASSUME_NONNULL_END
