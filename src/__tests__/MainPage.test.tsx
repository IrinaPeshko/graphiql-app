import Main from '@/pages/Main/Main';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Schema from '@/components/Main/Documentation/schema/Schema/Schema';
import Navigation from '@/components/Main/Documentation/schema/Navigation/Navigation';
import { mockData, mockTypes } from './fake-data/mockData';
import Details from '@/components/Main/Documentation/schema/Details/Details';

describe('Main component', () => {
  beforeEach(() => {
    const ResizeObserverMock = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('renders the Documentation component when isDocsOpen is true', async () => {
    const mockStore = configureMockStore();

    const store = mockStore({
      editor: {
        isDocOpen: false,
      },
      tabs: {
        tabs: [
          {
            requestContent: '',
            variablesContent: '',
            headersContent: '',
            responseContent: '',
            url: '',
          },
        ],
        activeTab: 0,
      },
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <Main />
          </Router>
        </Provider>
      );
    });

    waitFor(() => {
      fireEvent.click(screen.getByTitle('Show Documentation Explorer'));

      expect(screen.getByTestId('documentation')).toBeInTheDocument();
    });
  });

  it('renders the Schema component', () => {
    render(
      <Router>
        <Schema types={mockTypes} />
      </Router>
    );

    expect(
      screen.getByText(
        'A GraphQL schema provides a root type for each kind of operation.'
      )
    ).toBeInTheDocument();
  });

  it('calls setData when a field in Navigation is clicked and adds a new item', () => {
    const mockSetData = vi.fn();

    render(
      <Router>
        <Navigation data={mockData} setData={mockSetData} />
      </Router>
    );

    fireEvent.click(screen.getByText('Field1'));

    expect(mockSetData).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('navigation-item')).toHaveLength(
      mockData.length + 1
    );
  });

  it('renders description in Details component when provided', () => {
    const mockSetData = vi.fn();

    render(
      <Router>
        <Details type={mockTypes[1]} data={mockData[1]} setData={mockSetData} />
      </Router>
    );

    expect(screen.queryByText('This is a description')).toBeInTheDocument();
  });

  it('does not render description in Details component when not provided', () => {
    const mockSetData = vi.fn();

    render(
      <Details type={mockTypes[0]} data={mockData[0]} setData={mockSetData} />
    );

    expect(screen.queryByText('This is a description')).not.toBeInTheDocument();
  });
});
