import createApp from './app';

export default () => {
    const { app } = createApp(); //  创建了一个应用 
    return app; // createRenderer().renderToString(vm)
}