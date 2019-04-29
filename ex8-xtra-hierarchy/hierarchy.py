import sys

class Tag(object):
    def __init__(self, name, father, level):
        self.name = name
        self.father = father
        self.level = level

    def __str__(self):
        return '| '*(self.level-1) + self.name


def tokenize_line(string):
    # '#' is a special character used for splitting
    string = string.replace('<', '#<').replace('>', '>#').replace('\n', '').replace('\t', '').strip('\ufeff').strip(' ')
    return string.split('#')


if __name__ == '__main__':
    with open(sys.argv[1], 'r') as htmldoc:
        tokens = []
        for line in htmldoc:
            tokens += tokenize_line(line)

    # remove empty strings
    tokens = list(filter(lambda a: a != '', tokens))

    cur_tag = None
    level = 0
    for token in tokens:
        if token[0] == '<': # tag

            if token[1] == '/': # closing tag
                level -= 1
            elif token[1] == 'm': #meta tag, doesn't have closing tag
                meta = Tag(token.replace('<', '').replace('>', ''), cur_tag, level+1)
                print(meta)
            else: # opening tag
                level += 1
                cur_tag = Tag(token.replace('<', '').replace('>', ''), cur_tag, level)
                print(cur_tag)

        else: #content
            print('| '*level + 'content: ' + token)

