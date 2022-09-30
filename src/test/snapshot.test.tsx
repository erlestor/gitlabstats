import { render } from '@testing-library/react';
import App from '../App';

describe ('App, component hierarcy', () => {
    //Snapshot test of the DOM structure at start up.
    it('renders DOM correctly', () => {
        const tree = render(<App />);
        expect(tree).toMatchSnapshot();
    });
});





