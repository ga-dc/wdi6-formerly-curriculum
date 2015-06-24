# Homework

1. **Read:** [ProGit, Chapter 1.1](http://git-scm.com/book/en/Getting-Started-About-Version-Control)
2. **CLI Golf!** Using `mv`, `cp`, `rm` and `mkdir`, reorganize the kitchen in as few steps as possible!

Copy the text in your terminal prompt, and save it to a text file.


## Start Here:

    kitchen/
    ├── cans.txt
    ├── fridge
    │   ├── diapers.txt
    │   ├── freezer
    │   │   ├── couch.txt
    │   │   ├── frozenpeas.txt
    │   │   └── icecream.txt
    │   ├── milk.txt
    │   └── trashcan
    │       ├── banana-peels.txt
    │       ├── chicken-bones.txt
    │       ├── egg-shells.txt
    │       └── sink
    │           ├── clean-dishes.txt
    │           ├── delete-me.txt
    │           └── dirty-dishes.txt
    └── pantry
        ├── cans.txt
        ├── cereal.txt
        └── crisper-drawer
            └── lettuce.txt

## End Here:

    kitchen/
    ├── fridge/
    │   ├── crisper-drawer/
    │   │   ├── apples.txt
    │   │   └── lettuce.txt
    │   ├── freezer/
    │   │   ├── frozenpeas.txt
    │   │   └── icecream.txt
    │   └── milk.txt
    ├── pantry/
    │   ├── cans.txt
    │   └── cereal.txt
    ├── sink/
    │   ├── dirty-dishes.txt
    │   └── drying-rack/
    │       └── clean-dishes.txt
    └── trashcan/
        ├── banana-peels.txt
	    ├── chicken-bones.txt
	    └── egg-shells.txt