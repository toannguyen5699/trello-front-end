export const initialData = {
  boards: [
    {
      id: 'board-1',
      columnOrder: ['column-2', 'column-1', 'column-3'],
      columns: [
        {
          id: 'column-1',
          boardId: 'board-1',
          title: 'Todo',
          cardOder: [
            'card-1',
            'card-2',
            'card-3',
            'card-4',
            'card-5',
            'card-6',
          ],
          card: [
            {
              id: 'card-1',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 1',
              cover:
                'https://i.pinimg.com/originals/df/1d/21/df1d21b81911e57b650bf2bc8fdfd13f.jpg', // image
            },
            {
              id: 'card-2',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 2',
              cover: null, // image
            },
            {
              id: 'card-3',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 3',
              cover: null, // image
            },
            {
              id: 'card-4',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 4',
              cover: null, // image
            },
            {
              id: 'card-5',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 5',
              cover: null, // image
            },
            {
              id: 'card-6',
              boardId: 'board-1',
              columnId: 'column-1',
              title: 'Title Card 6',
              cover: null, // image
            },
          ],
        },
        {
          id: 'column-2',
          boardId: 'board-1',
          title: 'Inprogress',
          cardOder: ['card-7', 'card-8', 'card-9'],
          card: [
            {
              id: 'card-7',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title Card 7',
              cover: null, // image
            },
            {
              id: 'card-8',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title Card 8',
              cover: null, // image
            },
            {
              id: 'card-9',
              boardId: 'board-1',
              columnId: 'column-2',
              title: 'Title Card 9',
              cover: null, // image
            },
          ],
        },
        {
          id: 'column-3',
          boardId: 'board-1',
          title: 'In QA',
          cardOder: ['card-10', 'card-11', 'card-12'],
          card: [
            {
              id: 'card-10',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title Card 10',
              cover: null, // image
            },
            {
              id: 'card-11',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title Card 11',
              cover: null, // image
            },
            {
              id: 'card-12',
              boardId: 'board-1',
              columnId: 'column-3',
              title: 'Title Card 12',
              cover: null, // image
            },
          ],
        },
      ],
    },
  ],
};
