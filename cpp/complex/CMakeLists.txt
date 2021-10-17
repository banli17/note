cmake_minimum_required(VERSION 3.16)
project(complex)

find_package(ImageMagick COMPONENTS Magick++)

set(CMAKE_CXX_STANDARD 14)
add_executable(complex main.cpp)
