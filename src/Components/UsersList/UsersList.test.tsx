import { create } from 'react-test-renderer'
import { UsersList } from './index'
import { fireEvent, render, screen } from '@testing-library/react'

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom')),
  useNavigate: () => mockedUsedNavigate
}))

describe('Users List | Users', () => {
  it('should render a list of users', function () {
    const users = [
      {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      },
      {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg'
      },
      {
        id: 3,
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        last_name: 'Wong',
        avatar: 'https://reqres.in/img/faces/3-image.jpg'
      },
      {
        id: 4,
        email: 'eve.holt@reqres.in',
        first_name: 'Eve',
        last_name: 'Holt',
        avatar: 'https://reqres.in/img/faces/4-image.jpg'
      },
      {
        id: 5,
        email: 'charles.morris@reqres.in',
        first_name: 'Charles',
        last_name: 'Morris',
        avatar: 'https://reqres.in/img/faces/5-image.jpg'
      },
      {
        id: 6,
        email: 'tracey.ramos@reqres.in',
        first_name: 'Tracey',
        last_name: 'Ramos',
        avatar: 'https://reqres.in/img/faces/6-image.jpg'
      }
    ]
    const onPaginationChange = jest.fn()
    const deleteUser = jest.fn()
    const onUserDeleted = jest.fn()

    const list = create(
            <UsersList
                users={users}
                page={0}
                perPage={5}
                total={12}
                totalPages={2}
                onPaginationChange={onPaginationChange}
                deleteUser={deleteUser}
                isLoading={false}
                onUserDeleted={onUserDeleted}
            />
    )
    const tree = list.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('calls onPaginationChange with params', () => {
    const users = [
      {
        id: 1,
        email: 'george.bluth@reqres.in',
        first_name: 'George',
        last_name: 'Bluth',
        avatar: 'https://reqres.in/img/faces/1-image.jpg'
      },
      {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg'
      },
      {
        id: 3,
        email: 'emma.wong@reqres.in',
        first_name: 'Emma',
        last_name: 'Wong',
        avatar: 'https://reqres.in/img/faces/3-image.jpg'
      },
      {
        id: 4,
        email: 'eve.holt@reqres.in',
        first_name: 'Eve',
        last_name: 'Holt',
        avatar: 'https://reqres.in/img/faces/4-image.jpg'
      },
      {
        id: 5,
        email: 'charles.morris@reqres.in',
        first_name: 'Charles',
        last_name: 'Morris',
        avatar: 'https://reqres.in/img/faces/5-image.jpg'
      },
      {
        id: 6,
        email: 'tracey.ramos@reqres.in',
        first_name: 'Tracey',
        last_name: 'Ramos',
        avatar: 'https://reqres.in/img/faces/6-image.jpg'
      }
    ]
    const onPaginationChange = jest.fn()
    const deleteUser = jest.fn()
    const onUserDeleted = jest.fn()
    render(
            <UsersList
                users={users}
                page={0}
                perPage={5}
                total={12}
                totalPages={2}
                onPaginationChange={onPaginationChange}
                deleteUser={deleteUser}
                isLoading={false}
                onUserDeleted={onUserDeleted}
            />)
    fireEvent.click(screen.getByTitle('Go to next page'))
    expect(onPaginationChange).toHaveBeenCalledWith(1, 5)
  })
})
