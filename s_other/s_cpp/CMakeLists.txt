cmake_minimum_required(VERSION 3.16)
project(cpp)

set(CMAKE_CXX_STANDARD 14)

add_executable(cpp
        main.cpp Complex.cpp Complex.h stl01.cpp stl01.h testBasic.cpp testBasic.h)
