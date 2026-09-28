package core

type LobError struct {
	IsLobError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewLobError(code string, msg string, ctx *Context) *LobError {
	return &LobError{
		IsLobError: true,
		Sdk:              "Lob",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *LobError) Error() string {
	return e.Msg
}
