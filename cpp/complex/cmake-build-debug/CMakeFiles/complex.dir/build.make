# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.16

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /Applications/CLion.app/Contents/bin/cmake/mac/bin/cmake

# The command to remove a file.
RM = /Applications/CLion.app/Contents/bin/cmake/mac/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/banli/Desktop/learn/cpp/complex

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/banli/Desktop/learn/cpp/complex/cmake-build-debug

# Include any dependencies generated for this target.
include CMakeFiles/complex.dir/depend.make

# Include the progress variables for this target.
include CMakeFiles/complex.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/complex.dir/flags.make

CMakeFiles/complex.dir/main.cpp.o: CMakeFiles/complex.dir/flags.make
CMakeFiles/complex.dir/main.cpp.o: ../main.cpp
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/banli/Desktop/learn/cpp/complex/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/complex.dir/main.cpp.o"
	/usr/bin/g++  $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -o CMakeFiles/complex.dir/main.cpp.o -c /Users/banli/Desktop/learn/cpp/complex/main.cpp

CMakeFiles/complex.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/complex.dir/main.cpp.i"
	/usr/bin/g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/banli/Desktop/learn/cpp/complex/main.cpp > CMakeFiles/complex.dir/main.cpp.i

CMakeFiles/complex.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/complex.dir/main.cpp.s"
	/usr/bin/g++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/banli/Desktop/learn/cpp/complex/main.cpp -o CMakeFiles/complex.dir/main.cpp.s

# Object files for target complex
complex_OBJECTS = \
"CMakeFiles/complex.dir/main.cpp.o"

# External object files for target complex
complex_EXTERNAL_OBJECTS =

complex: CMakeFiles/complex.dir/main.cpp.o
complex: CMakeFiles/complex.dir/build.make
complex: CMakeFiles/complex.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/banli/Desktop/learn/cpp/complex/cmake-build-debug/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable complex"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/complex.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/complex.dir/build: complex

.PHONY : CMakeFiles/complex.dir/build

CMakeFiles/complex.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/complex.dir/cmake_clean.cmake
.PHONY : CMakeFiles/complex.dir/clean

CMakeFiles/complex.dir/depend:
	cd /Users/banli/Desktop/learn/cpp/complex/cmake-build-debug && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/banli/Desktop/learn/cpp/complex /Users/banli/Desktop/learn/cpp/complex /Users/banli/Desktop/learn/cpp/complex/cmake-build-debug /Users/banli/Desktop/learn/cpp/complex/cmake-build-debug /Users/banli/Desktop/learn/cpp/complex/cmake-build-debug/CMakeFiles/complex.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/complex.dir/depend

